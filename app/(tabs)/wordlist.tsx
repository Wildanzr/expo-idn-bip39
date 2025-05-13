import { Text } from "@/components/nativewindui/text";
import { BIP39_WORDLIST } from "@/constants/bip39";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Screen() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View className="px-4 py-2 border-b border-gray-200">
      <Text className="text-base">
        <Text className="font-semibold">{index + 1}.</Text> {item}
      </Text>
    </View>
  );

  return (
    <View style={{ height }} className="flex-1">
      <Text variant="title3" className="py-4 font-semibold text-center">
        Indonesian BIP39 Wordlist
      </Text>

      <FlatList
        data={BIP39_WORDLIST}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={true}
        initialNumToRender={20}
        className="flex-1 w-full"
      />
    </View>
  );
}
