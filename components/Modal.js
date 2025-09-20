import { View, Modal as RNModal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../style/theme'

const Modal = ({ children, visible, onRequestClose, style = {} }) => {
  return (
    <RNModal animationType="fade" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <Pressable style={styles.centeredView} onPress={e => e.target == e.currentTarget && onRequestClose()}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.9)']}
            style={[styles.modalView, style]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.glassBorder} />
            {children}
          </LinearGradient>
        </View>
      </Pressable>
    </RNModal>
  )
}

export default Modal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    width: "85%",
    maxWidth: 400,
  },
  modalView: {
    borderRadius: theme.RADIUS.XXL,
    padding: theme.SPACING.XL,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...theme.ELEVATION.GLASS,
  },
  glassBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.RADIUS.XXL,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    pointerEvents: 'none',
  }
})
