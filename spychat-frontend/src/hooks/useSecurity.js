import { useSecurityContext } from "../context/SecurityContext.jsx";

export default function useSecurity() {
  return useSecurityContext();
}
