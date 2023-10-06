import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export const AddComponent: React.FC<{ opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }> = ({opened, setOpened}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    if (opened) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }
  , [opened]);

  return (
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        onClose={() => {setOpened(false)}}
        detached={true}
      >
        <View style={styles.contentContainer}>
          <Text>item</Text>

        </View>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: 'center',
  },
});