import React, { useCallback, useEffect, useMemo, useRef, Children, useState, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import useThemedStyles from '../../hooks/Theme/useThemedStyle';
import useTheme from '../../hooks/Theme/useTheme';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ThemeTypeContext } from '../../constants/Theme';

export type AddComponentProps = {
  children?: string | JSX.Element | JSX.Element[]
  opened?: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  ref?: React.Ref<BottomSheetMethods> | undefined
  content?: React.ReactNode
}

export const BottomSheetComponent: React.FC<AddComponentProps> = React.forwardRef(({children, opened, setOpened, content}, ref) => {
  const Styles = useThemedStyles(styles);
  const Theme = useTheme();
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  let sheetRef: BottomSheetMethods | null;

  return (
      <BottomSheet
        index={-1}
        enableContentPanningGesture={false}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        ref={(node) => {
          sheetRef = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }}}
        onClose={() => { setOpened(false) }}
        handleStyle={{backgroundColor: Theme.colors.Black, borderTopLeftRadius: 20, borderTopRightRadius: 20}}
        handleIndicatorStyle={{backgroundColor: Theme.colors.White}}
        backgroundStyle={{backgroundColor: Theme.colors.Black}}
        backdropComponent={() => {
          return (
            <View style={opened ? Styles.containerUnfocused : Styles.container} onTouchStart={() => { sheetRef!.close(); setOpened(false) }}>
              {children}
            </View>
          )
        }}
      >
        <View style={Styles.contentContainer}>
          {content}
        </View>
      </BottomSheet>
  );
});

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
  containerUnfocused: {
    flex: 1,
    backgroundColor: 'grey',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
});