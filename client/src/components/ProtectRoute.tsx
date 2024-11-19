import { useStore } from "../store";
// Hook:
import { useLocation, Navigate } from "react-router-dom";

function ProtectRoute(props: any) {
    const {state} = useStore()!;
    const location = useLocation();


    if (!state.loading && state.user && location.pathname.match(/(register|login)/gi)) {
        return <Navigate to="/dashboard" />
    }

    if (!state.loading && !state.user && location.pathname.match(/(pet|post|dashboard)/gi)) {
        return <Navigate to="/login" />
    }

    return props.children;
}

export default ProtectRoute;