import { useState, useCallback, } from 'react';
import Header from 'components/Header';
import uniqid from 'uniqid';
import axios from 'axios';
import Input from 'components/Input';
import List from 'components/List';
import 'App.css';

export default function App() {
  const [data, setData] = useState([]);

  const getData = useCallback(function() {
    axios.get("https://random-data-api.com/api/name/random_name?size=5")
      .then(res => setData(res.data));
  }, []);


  const addItem = function(text) {
    if (!text) return;
    setData([...data, { name: text, "uid": uniqid() }]);
  };

  const deleteItem = function(uid) {
    setData(data.filter(item => item.uid !== uid));
  };


  return (
    <div className="App">

      <Header text="My Friends" />
      <Input onSave={addItem}></Input>

      <button data-testid="load-friends" type="button" onClick={getData}>Get New Friends</button>

      <List items={data} deleteItem={deleteItem}/>
    </div>
  );
};