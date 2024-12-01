import React, { useState, useEffect } from "react";
import "./TabStyles.css";

const BikePartTab = () => {
    const API_URL = "http://localhost:5173/api/BikePart";

    const bikePartModel = {
        partType: "",
        description: "",
        manufacturer: "",
        price: null,
        stockQuantity: 0,
    }

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBikePart, setNewItem] = useState(bikePartModel);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await fetch(API_URL).then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => {
                console.error("Error fetching items:", error);
            });
    };

    const fetchItemDetails = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const data = await response.json();
            setSelectedItem(data);
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };

    const handleSave = async () => {
        const response = await fetch(`${API_URL}/${selectedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedItem),
        }).then((response) => {
            if (response.ok) {
                setSelectedItem(null);
                fetchItems();
            } else {
                alert("Failed to update bike data. Please check your details.");
            }
        }).catch((error) => {
            console.error("Error adding:", error);
            alert("An error occurred. Please try again.");
        });
    };

    const handleUpdate = (field, value) => {
        setSelectedItem((prevItem) => ({
            ...prevItem,
            [field]: value,
        }));
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (isConfirmed) {
            fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                }
            }).catch((error) => {
                console.error("Delete error:", error);
                alert("An error occurred. Please try again.");
            });
        }
    };

    const handleAdd = (id) => {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBikePart),
        }).then((response) => {
            if (response.ok) {
                fetchItems();
                setShowAddForm(false);
                setNewItem(bikePartModel);
            } else {
                alert("Failed to add bike. Please check your details.");
            }
        }).catch((error) => {
            console.error("Error adding:", error);
            alert("An error occurred. Please try again.");
        });
    };

    return (
        <div className="container">
            <h1>List of bike parts</h1>

            <button className="add-button" onClick={() => setShowAddForm(true)}>
                Add new part of the bicycle
            </button>
            <ul className="item-list">
                {items.map((item) => (
                    <li key={item.id}>
                        <span>
                            <strong>{item.partType}</strong> by {item.manufacturer} ({item.stockQuantity} in Stock)
                        </span>
                        <div>
                            <button
                                onClick={() => fetchItemDetails(item.id)}
                                className="edit-button"
                            >Edit</button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {
                showAddForm && (
                    <div className="add-form">
                        <h2>Add new bike parts</h2>
                        <label>
                            <strong>Part Type:</strong>
                            <input
                                type="text"
                                value={newBikePart.partType}
                                onChange={(e) => setNewItem({ ...newBikePart, partType: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            <strong>Description:</strong>
                            <input
                                type="text"
                                value={newBikePart.description}
                                onChange={(e) => setNewItem({ ...newBikePart, description: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            <strong>Manufacturer:</strong>
                            <input
                                type="text"
                                value={newBikePart.manufacturer}
                                onChange={(e) =>
                                    setNewItem({ ...newBikePart, manufacturer: e.target.value })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            <strong>Price:</strong>
                            <input
                                type="number"
                                value={newBikePart.price}
                                onChange={(e) => setNewItem({ ...newBikePart, price: Number(e.target.value) })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            <strong>Stock quantity:</strong>
                            <input
                                type="number"
                                value={newBikePart.stockQuantity}
                                onChange={(e) =>
                                    setNewItem({ ...newBikePart, stockQuantity: Number(e.target.value) })
                                }
                            />
                        </label>
                        <br />
                        <button
                            onClick={handleAdd}
                            className="save-button"
                        >Save</button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="cancel-button">Cancel</button>
                    </div>
                )
            }
            {
                selectedItem && (
                    <div className="edit-form">
                        <h2>Editing an item</h2>
                        <label>
                            <strong>Part Type:</strong>
                            <input
                                type="text"
                                value={selectedItem.partType}
                                onChange={(e) => handleUpdate("partType", e.target.value)}
                            />
                        </label>
                        <label>
                            <strong>Description:</strong>
                            <input
                                type="text"
                                value={selectedItem.description}
                                onChange={(e) => handleUpdate("description", e.target.value)}
                            />
                        </label>
                        <label>
                            <strong>Manufacturer:</strong>
                            <input
                                type="text"
                                value={selectedItem.manufacturer}
                                onChange={(e) => handleUpdate("manufacturer", e.target.value)}
                            />
                        </label>
                        <label>
                            <strong>Price:</strong>
                            <input
                                type="number"
                                value={selectedItem.price || ""}
                                onChange={(e) => handleUpdate("price", Number(e.target.value))}
                            />
                        </label>
                        <label>
                            <strong>Stock quantity:</strong>
                            <input
                                type="number"
                                value={selectedItem.stockQuantity}
                                onChange={(e) => handleUpdate("stockQuantity", Number(e.target.value))}
                            />
                        </label>
                        <button
                            onClick={handleSave}
                            className="save-button">Save</button>
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="cancel-button">Cancel</button>
                    </div>
                )
            }
        </div >
    );
};

export default BikePartTab;