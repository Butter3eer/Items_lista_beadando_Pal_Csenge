import React, { useState } from "react";
import Item from "./ItemClass";
import './Items.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faX } from '@fortawesome/free-solid-svg-icons';

const Items: React.FC = () => {
    const [newState, setNewState] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>("");
    const [newCategory, setNewCategory] = useState<string>("");

    const [itemList, setItemList] = useState<Item[]>([
        new Item("Alma", "Gyümölcs"),
        new Item("Malac", "Állat"),
        new Item("Kalács", "Étel")
    ]);

    const [changingItemList, setChangingItemList] = useState<Item[]>(itemList);
    const [categoriesList, setCategoriesList] = useState<string[]>(() => {
        const uniqueCategories = itemList.map(item => item.category);
        return Array.from(new Set(uniqueCategories));
    });

    const createButton = (category: string) => (
        <button key={category} onClick={() => searchByCategory(category)}>{category}</button>
    );

    const searchByCategory = (category: string) => {
        setChangingItemList(itemList.filter(item => item.category === category));
    };

    const newItem = (name: string, category: string) => {
        if (name === "" || category === "") {
            window.alert("Mind a 2 mező kitöltése kötelező.");
        } else {
            if (!itemList.some(item => item.name === name)) {
                const newItemList = [...itemList, new Item(name, category)];
                setItemList(newItemList);
                setCategoriesList(Array.from(new Set(newItemList.map(item => item.category))));
                setChangingItemList(newItemList);
            } else {
                window.alert("Már létezik ilyen névvel item.");
            }
        }
    };

    const deleteDecision = (item: Item) => {
        const filteredList = itemList.splice( itemList.indexOf(item), 1);
        setChangingItemList(filteredList);
        setItemList(filteredList);
        setCategoriesList(Array.from(new Set(itemList.map(item => item.category))));
    };

    const changeItemDeleteState = (item: Item, value: boolean) => {
        const updatedList = itemList.map(listItem => listItem === item ? { ...listItem, deleteState: value } : listItem);
        setItemList(updatedList);
        setChangingItemList(updatedList);
    };

    const inputSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setChangingItemList(itemList.filter(item => item.name.includes(value)));
    };

    return (
        <div className="item_main">
            {newState ? (
                <div>
                    <label>
                        Item: <br/>
                        <input className="display" type="text" onChange={(e) => setNewName(e.target.value)}/> <br/>
                    </label>
                    <label>
                        Category: <br/>
                        <input className="display" type="text" onChange={(e) => setNewCategory(e.target.value)} />
                    </label>
                    <div className="buttons">
                        <button onClick={() => {newItem(newName, newCategory); setNewState(false);}}>Create</button>
                    </div>
                </div>
            ) : (
                <div className="mainForm">
                    <div className="buttons">
                        {categoriesList.length > 0 ? (<button onClick={() => setChangingItemList(itemList)}>All</button>): null}
                        {categoriesList.map(createButton)}
                        <button onClick={() => setNewState(true)}>New</button>
                    </div>
                    <div className="input-group">
                    <input
                            className="display"
                            type="text"
                            onChange={inputSearching}
                        />
                    </div>
                    <div className="items_list">
                        <ul>
                            {changingItemList.map(item => (
                                <li key={item.name}>
                                    {item.name}
                                    {!item.deleteState ? (
                                        <button className="button-delete" onClick={() => changeItemDeleteState(item, true)}><FontAwesomeIcon icon={faTrash}/></button>
                                    ) : (
                                        <div className="buttons-delete">
                                            <button onClick={() => changeItemDeleteState(item, false)}><FontAwesomeIcon icon={faX} /></button>
                                            <button onClick={() => { deleteDecision(item); changeItemDeleteState(item, false) }}><FontAwesomeIcon icon={faCheck} /></button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Items;
