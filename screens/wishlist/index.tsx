import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/components';
import { ROUTES, spacing } from '@/constants';

import { AddWishlistSlide, WishlistSlideContent } from './components';
import { type WishlistSlide } from './types';

const WISHLIST_SLIDES: WishlistSlide[] = [{ id: 'main', title: 'Мій вішліст', emoji: '✨' }];

export default function WishlistScreen() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [...WISHLIST_SLIDES, { id: 'add', title: '', emoji: '' }];

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.buttonContainerHeader}>
        <IconButton variant={'secondary'} icon="person.fill" onPress={() => router.push(ROUTES.PROFILE)} />
        <IconButton variant={'secondary'} icon="square.grid.2x2.fill" onPress={() => {}} />
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.slider}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            {slide.id === 'add' ? (
              <AddWishlistSlide activeIndex={activeIndex} slideCount={slides.length} />
            ) : (
              <WishlistSlideContent slide={slide} activeIndex={activeIndex} slideCount={slides.length} />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing[4],
  },
  slider: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  iconEllipsis: {
    transform: [{ rotate: '90deg' }],
    width: 16,
    height: 16,
    padding: spacing[2],
  },
});
