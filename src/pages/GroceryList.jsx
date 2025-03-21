import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Trash, Save, List, Calendar, Edit2 } from 'lucide-react';
import BackButton from '../components/ui/back-button';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [listName, setListName] = useState('');
  const [savedLists, setSavedLists] = useState(() => {
    const saved = localStorage.getItem('groceryLists');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingList, setEditingList] = useState(null);

  useEffect(() => {
    localStorage.setItem('groceryLists', JSON.stringify(savedLists));
  }, [savedLists]);

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), text: newItem, completed: false }]);
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const saveList = () => {
    if (listName.trim() && items.length > 0) {
      const newList = {
        id: editingList?.id || Date.now(),
        name: listName,
        items: items,
        date: new Date().toISOString()
      };

      if (editingList) {
        setSavedLists(savedLists.map(list => 
          list.id === editingList.id ? newList : list
        ));
      } else {
        setSavedLists([...savedLists, newList]);
      }

      setListName('');
      setItems([]);
      setEditingList(null);
    }
  };

  const loadList = (list) => {
    setEditingList(list);
    setListName(list.name);
    setItems(list.items);
  };

  const deleteList = (id) => {
    setSavedLists(savedLists.filter(list => list.id !== id));
    if (editingList?.id === id) {
      setEditingList(null);
      setListName('');
      setItems([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 px-4 relative"
    >
      <BackButton />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-6">Grocery Lists</h1>
          <p className="text-lg text-white/70 mb-8">
            Create and manage your shopping lists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current List */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                List Name
              </label>
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <form onSubmit={addItem} className="flex gap-2 mb-6">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add an item..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>

            <div className="space-y-2 mb-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-white/5 rounded-lg group"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.completed ? 'bg-green-500 border-green-500' : 'border-white/20'
                    }`}
                  >
                    {item.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <span className={`flex-1 text-white ${item.completed ? 'line-through opacity-50' : ''}`}>
                    {item.text}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-red-400 transition-opacity"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={saveList}
              disabled={!listName.trim() || items.length === 0}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {editingList ? 'Update List' : 'Save List'}
            </button>
          </div>

          {/* Saved Lists */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-6">
              <List className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Saved Lists</h2>
            </div>

            <div className="space-y-4">
              {savedLists.map((list) => (
                <div
                  key={list.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">{list.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadList(list)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteList(list.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(list.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{list.items.length} items</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {list.items.slice(0, 3).map((item) => (
                        <span
                          key={item.id}
                          className="px-2 py-1 text-sm bg-white/5 rounded-lg text-white/70"
                        >
                          {item.text}
                        </span>
                      ))}
                      {list.items.length > 3 && (
                        <span className="px-2 py-1 text-sm bg-white/5 rounded-lg text-white/70">
                          +{list.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {savedLists.length === 0 && (
                <div className="text-center py-8 text-white/50">
                  No saved lists yet. Create your first list!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GroceryList;