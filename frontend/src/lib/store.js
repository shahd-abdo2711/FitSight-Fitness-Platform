// Manages global app state, persists data in localStorage, and provides reusable actions for users, workouts, bookings, and notifications.(without redux)
import { useSyncExternalStore } from "react";

const KEY = "fitsight-state-v1";

export const DEFAULT_STATE = {
  user: null,
  profile: null,
  sessions: [],
  bookings: [],
  notifications: {
    workoutReminders: true,
    recommendations: true,
    coachUpdates: false,
    weeklyReport: true,
  },
};

let state = DEFAULT_STATE;
let loaded = false;
const listeners = new Set();

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    state = DEFAULT_STATE;
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable */
  }
}

export function setState(updater) {
  load();
  state = updater(state);
  persist();
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  load();
  return state;
}

export const getStateSnapshot = getSnapshot;

export function useAppState(selector) {
  const s = useSyncExternalStore(subscribe, getSnapshot);
  return selector(s);
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

/** A few past sessions so charts and recommendations have data on day one. */
export function seedSessions(now = Date.now()) {
  const plan = [
    ["bodyweight-squat", 14, 72, 420],
    ["push-up", 10, 68, 300],
    ["forearm-plank", 5, 80, 240],
    ["bodyweight-squat", 15, 76, 430],
    ["glute-bridge", 15, 84, 330],
    ["push-up", 12, 74, 320],
    ["walking-lunge", 18, 79, 560],
    ["bodyweight-squat", 16, 83, 450],
  ];
  return plan.map(([exerciseId, reps, formScore, durationSec], i) => ({
    id: uid(),
    exerciseId,
    reps,
    formScore,
    durationSec,
    date: new Date(now - (plan.length - i) * 2 * 86400000).toISOString(),
  }));
}

export const actions = {
  login(email) {
    setState((s) => ({
      ...s,
      user: { email, name: s.user?.name ?? email.split("@")[0] ?? email },
      sessions: s.sessions.length ? s.sessions : seedSessions(),
    }));
  },
  signup(name, email) {
    setState((s) => ({ ...s, user: { name, email }, profile: null, sessions: seedSessions() }));
  },
  saveProfile(profile) {
    setState((s) => ({
      ...s,
      profile,
      user: s.user ? { ...s.user, name: profile.name } : s.user,
    }));
  },
  updateAccount(name, email) {
    setState((s) => ({
      ...s,
      user: { name, email },
      profile: s.profile ? { ...s.profile, name } : s.profile,
    }));
  },
  addSession(input) {
    const session = { ...input, id: uid(), date: new Date().toISOString() };
    setState((s) => ({ ...s, sessions: [...s.sessions, session] }));
    return session;
  },
  addBooking(b) {
    setState((s) => ({ ...s, bookings: [...s.bookings, { ...b, id: uid() }] }));
  },
  cancelBooking(id) {
    setState((s) => ({ ...s, bookings: s.bookings.filter((b) => b.id !== id) }));
  },
  setNotifications(n) {
    setState((s) => ({ ...s, notifications: n }));
  },
  logout() {
    setState(() => DEFAULT_STATE);
  },
};