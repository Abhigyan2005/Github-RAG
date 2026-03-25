import { useState } from "react";

export default function Avatar({ user, size = 8 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = user?.name?.split(" ").map((n) => n[0]).join("") || "?";
  const sizeClass = `w-${size} h-${size}`;

  if (user?.avatar && !imgFailed) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        onError={() => setImgFailed(true)}
        className={`${sizeClass} rounded-full object-cover shrink-0 border border-[#464555]/40`}
      />
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] flex items-center justify-center text-[#0b1326] text-xs font-bold shrink-0`}>
      {initials}
    </div>
  );
}