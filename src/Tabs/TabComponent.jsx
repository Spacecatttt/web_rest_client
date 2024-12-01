import React, { useState } from "react";
import './TabComponent.css';
import BicycleTab from "./BicycleTab";
import BikePartTab from "./BikePartTab";

export const TabComponent = () => {
    const [activeTab, setActiveTab] = useState("Bicycle");

    return (
        <div className="tab-container">
            <div className="tab-buttons">
                <button
                    onClick={() => setActiveTab("Bicycle")}
                    className={activeTab === "Bicycle" ? "active" : ""}
                >
                    Bicycle
                </button>
                <button
                    onClick={() => setActiveTab("BikePart")}
                    className={activeTab === "BikePart" ? "active" : ""}
                >
                    BikePart
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "Bicycle" && <BicycleTab />}
                {activeTab === "BikePart" && <BikePartTab />}
            </div>
        </div>
    );
};