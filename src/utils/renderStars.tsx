import style from '@/styles/app.product-new.module.css';
const RenderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    return (
        <div className={style["star"]}>
            {[...Array(full)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                    <path d="M9.24 0.25L11.86 5.89L18.04 6.64L13.48 10.87L14.68 16.97L9.24 13.95L3.81 16.97L5.01 10.87L0.45 6.64L6.63 5.89L9.24 0.25Z" fill="#FFC633" />
                </svg>
            ))}
            {half && (
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                    <path d="M3.76 16.97L9.19 13.95V0.25L6.57 5.89L0.4 6.64L4.96 10.87L3.76 16.97Z" fill="#FFC633" />
                </svg>
            )}
        </div>
    );
};
export default RenderStars;