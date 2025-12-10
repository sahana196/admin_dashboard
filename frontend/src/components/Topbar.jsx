import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const triggerSearch = (term) => {
        const q = (term ?? searchTerm).trim();
        if (!q) return;
        // Navigate to employees page with search term as a visible demo
        navigate(`/employees?search=${encodeURIComponent(q)}`);
    };

    // handle form submit (covers clicking the icon/button and pressing Enter)
    const handleSubmit = (e) => {
        e.preventDefault();
        triggerSearch();
    };

    return (
        <div className="topbar">
            <form
                className="search"
                role="search"
                onSubmit={handleSubmit}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
                <button
                    type="submit"
                    aria-label="Search"
                    title="Search"
                    style={{
                        cursor: "pointer",
                        fontSize: 18,
                        background: "transparent",
                        border: "none",
                        padding: 6,
                    }}
                >
                    🔎
                </button>

                <input
                    id="quickSearch"
                    aria-label="Search users, reports or tickets"
                    placeholder="Search users, reports or tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, minWidth: 120 }}
                    autoComplete="off"
                />
            </form>

            <div className="top-actions">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ background: "linear-gradient(90deg,var(--accent1),var(--accent2))", padding: "8px 14px", borderRadius: 999, color: "white", fontWeight: 800 }}>
                        Last 24h
                    </div>
                    <small style={{ color: "var(--muted)", marginTop: 6 }}>Updated just now</small>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
