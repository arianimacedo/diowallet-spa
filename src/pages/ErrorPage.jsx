import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="text-5xl flex flex-col justify-center items-center">
            <h1>
                {error.status}                
            </h1>
            <span>
                {error.statusText}
            </span>
            <span>
                {error.data}
            </span>
        </div>
    )
}