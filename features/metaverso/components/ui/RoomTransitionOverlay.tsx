"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

export function RoomTransitionOverlay() {
  const isRoomTransitioning = useUapaStore((s) => s.isRoomTransitioning);
  const transitioningToIndex = useUapaStore((s) => s.transitioningToIndex);
  const roomsMeta = useUapaStore((s) => s.roomsMeta);
  const currentRoomColor = useUapaStore((s) => s.currentRoomColor);

  const targetName =
    transitioningToIndex !== null
      ? roomsMeta[transitioningToIndex]?.name
      : null;
  const targetColor =
    transitioningToIndex !== null
      ? roomsMeta[transitioningToIndex]?.color
      : currentRoomColor;

  return (
    <AnimatePresence>
      {isRoomTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030014]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="mb-5 h-14 w-14 rounded-full border-2 border-transparent"
            style={{ borderTopColor: targetColor }}
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-[#e8f4ff]/70"
          >
            Cambiando de sala...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-1 text-lg font-semibold"
            style={{ color: targetColor }}
          >
            {targetName ?? "Nueva sala"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
