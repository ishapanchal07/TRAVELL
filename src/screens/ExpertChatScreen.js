import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function ExpertChatScreen({ route, navigation }) {
    const { expert } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: `Hi! I'm ${expert.name}. How can I help you plan your perfect day?`, type: 'expert', time: '10:00 AM' }
    ]);
    const flatListRef = useRef(null);
    const insets = useSafeAreaInsets();

    const scrollToBottom = (animated = true) => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated });
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => scrollToBottom(true)
        );
        return () => keyboardDidShowListener.remove();
    }, [messages]);

    useEffect(() => {
        scrollToBottom(false);
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMsg = {
                id: Date.now().toString(),
                text: message.trim(),
                type: 'user',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            const updatedMessages = [...messages, newMsg];
            setMessages(updatedMessages);
            setMessage('');
            
            // Immediate scroll after sending
            setTimeout(() => scrollToBottom(true), 100);

            // Simulate auto-reply
            setTimeout(() => {
                const reply = {
                    id: (Date.now() + 1).toString(),
                    text: "Got it! I'll check my availability and get back to you shortly.",
                    type: 'expert',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, reply]);
                setTimeout(() => scrollToBottom(true), 100);
            }, 1500);
        }
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.type === 'user' ? styles.userMessage : styles.expertMessage]}>
            <Text style={[styles.messageText, item.type === 'user' ? styles.userText : styles.expertText]}>
                {item.text}
            </Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <View style={styles.headerProfile}>
                    <Image source={{ uri: expert.image }} style={styles.headerThumb} />
                    <View>
                        <Text style={styles.headerName}>{expert.name}</Text>
                        <Text style={styles.headerStatus}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerMore}>
                    <Feather name="more-vertical" size={24} color="#0F172A" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.chatList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => scrollToBottom(true)}
                />

                <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                    <TouchableOpacity style={styles.attachBtn}>
                        <Feather name="plus" size={24} color="#64748B" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        maxHeight={120}
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        padding: 4,
    },
    headerProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    headerThumb: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    headerStatus: {
        fontSize: 12,
        color: '#10B981',
        fontWeight: '600',
    },
    headerMore: {
        padding: 4,
    },
    chatList: {
        padding: 20,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 14,
        borderRadius: 20,
        marginBottom: 16,
    },
    expertMessage: {
        backgroundColor: '#F1F5F9',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    userMessage: {
        backgroundColor: '#000',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    expertText: {
        color: '#0F172A',
    },
    userText: {
        color: 'white',
    },
    messageTime: {
        fontSize: 10,
        color: '#94A3B8',
        marginTop: 6,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        backgroundColor: 'white',
    },
    attachBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 8,
        fontSize: 15,
        maxHeight: 100,
    },
    sendBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#000',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
