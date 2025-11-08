import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState<{ id: string; text: string; done: boolean }[]>([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text, done: false }]);
    setText('');
  };

  const toggleTodo = (id: string) =>
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id: string) =>
    setTodos(todos.filter(t => t.id !== id));

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        Todo App
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 5 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 6 }}
          placeholder="Enter todo..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity
          style={{ marginLeft: 5, paddingHorizontal: 10, justifyContent: 'center' }}
          onPress={addTodo}>
          <Text style={{ fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={t => t.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleTodo(item.id)}>
              <Text
                style={{
                  fontSize: 16,
                  textDecorationLine: item.done ? 'line-through' : 'none',
                }}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={{ fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
