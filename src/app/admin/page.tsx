import style from '@/app/admin/styles/app.home.module.css';

export default function HomePageAdmin() {
    return (
        <div className={style["container"]}>
            <div className={style["content"]}>
                <h1>Dashboard Overview</h1>
                <div className={style["cards"]}>
                    <div className={style["card"]}>
                        <h2>Total Sales</h2>
                        <p>$12,430</p>
                    </div>
                    <div className={style["card"]}>
                        <h2>Active Users</h2>
                        <p>1,203</p>
                    </div>
                    <div className={style["card"]}>
                        <h2>Pending Orders</h2>
                        <p>14</p>
                    </div>
                </div>
                <div className={style["section"]}>
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>✅ Order #12345 was delivered successfully</li>
                        <li>👤 New customer registered</li>
                        <li>📦 Product “iPhone 16 Pro” added</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}