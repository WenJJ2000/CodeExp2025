import React, { useState, useEffect } from 'react';
import Markdown from 'react-native-markdown-display';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  useColorScheme,
} from 'react-native';
import { scamGuide } from '~/testData/lecture/scam_awareness_guide';

export default function LecturePage() {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Markdown
        style={
          colorScheme == 'dark'
            ? {
                body: { color: '#FFFFFF' },
                heading1: { color: '#FFD700' },
                heading2: { color: '#FFA500' },
                bullet_list: { color: '#CCCCCC' },
                code_inline: { color: '#00FF00' },
                link: { color: '#1E90FF' },
              }
            : {
                body: { color: '#1A1A1A' }, // Dark gray for main text
                heading1: { color: '#2C3E50' }, // Navy for h1
                heading2: { color: '#34495E' }, // Slate for h2
                bullet_list: { color: '#444444' }, // Slightly muted bullets
                code_inline: {
                  color: '#C7254E', // Bootstrap-style red
                  backgroundColor: '#F9F2F4',
                  borderRadius: 4,
                  paddingHorizontal: 4,
                },
                code_block: {
                  color: '#2C3E50',
                  backgroundColor: '#F4F4F4',
                  borderRadius: 6,
                  padding: 10,
                },
                link: { color: '#007AFF' }, // iOS-style blue link
                blockquote: {
                  color: '#555555',
                  borderLeftColor: '#DDD',
                  borderLeftWidth: 4,
                  paddingLeft: 12,
                },
              }
        }
      >
        {scamGuide}
      </Markdown>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
