// src/eventComponents/EventList.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EventCard from "./EventCard";

function AnimatedEventCard({ event }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <EventCard event={event} />
    </motion.div>
  );
}

export default function EventList({ events }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 32,
      }}
    >
      {events.map((event) => (
        <AnimatedEventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
