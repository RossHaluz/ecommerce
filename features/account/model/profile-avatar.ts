// Mirrors the backend limit, so the person learns before uploading rather than after.
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const isAcceptableAvatar = ({ type, size }: { type: string; size: number }) =>
  AVATAR_TYPES.includes(type) && size <= MAX_AVATAR_BYTES;

/** Old accounts store a protocol-less gravatar link; uploads store a file name served from /avatars. */
export const avatarUrl = (avatar: string | undefined, backendUrl: string | undefined) => {
  if (!avatar) return null;
  if (avatar.startsWith("//")) return `https:${avatar}`;
  return `${backendUrl}/avatars/${encodeURIComponent(avatar)}`;
};

export const AVATAR_ACCEPT = AVATAR_TYPES.join(",");
