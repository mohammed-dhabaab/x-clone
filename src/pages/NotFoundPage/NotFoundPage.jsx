import { Link, useRouteError } from "react-router-dom";
import styles from "../../styles"

function NotFoundPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <main className={`${styles.outerWrapper} flex items-center justify-center h-screen`}>
            <div className={`${styles.wrapper} flex flex-col items-center justify-center gap-3`}>
                <h1 className={`${styles.heading1} mt-8`}>Oops!</h1>
                <p
                    className={`${styles.paragraph} mb-2 max-w-prose text-center text-gray-400`}
                >
                    Not Found
                </p>
                <Link to={"/"} className={`${styles.primaryButton}`}>Home</Link >
            </div>
        </main>
    )
}

export default NotFoundPage