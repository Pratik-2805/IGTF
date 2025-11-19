"use client";

import { useState, useEffect, useCallback } from "react";
import { Event, URLS, getAuthHeaders } from "@/utils/api";
import { toast } from "sonner";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // For modal editing
  const [editingItem, setEditingItem] = useState<Event | null>(null);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(URLS.EVENTS, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      setEvents(data.results || data);
    } catch (error) {
      toast.error("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Add Event
  const addEvent = async (data: any) => {
    try {
      const res = await fetch(URLS.EVENTS, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...data,
          exhibitors: parseInt(data.exhibitors),
          buyers: parseInt(data.buyers),
          countries: parseInt(data.countries),
          sectors: parseInt(data.sectors),
          is_past: data.is_past === "on" || data.is_past === true,
        }),
      });

      if (!res.ok) throw new Error("Failed to create event");

      toast.success("Event created successfully!");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to create event.");
    }
  };

  // Edit Event
  const editEvent = async (data: any) => {
    if (!editingItem) return;

    try {
      const res = await fetch(`${URLS.EVENTS}${editingItem.id}/`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...data,
          exhibitors: parseInt(data.exhibitors),
          buyers: parseInt(data.buyers),
          countries: parseInt(data.countries),
          sectors: parseInt(data.sectors),
          is_past: data.is_past === "on" || data.is_past === true,
        }),
      });

      if (!res.ok) throw new Error("Failed to update event");

      toast.success("Event updated successfully!");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to update event.");
    }
  };

  // Delete Event
  const deleteEvent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${URLS.EVENTS}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Event deleted successfully.");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event.");
    }
  };

  return {
    events,
    loading,
    editingItem,
    setEditingItem,

    addEvent,
    editEvent,
    deleteEvent,

    refetch: fetchEvents,
  };
}
