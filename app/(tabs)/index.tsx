import { Button } from "@/components/nativewindui/Button";
import { Text } from "@/components/nativewindui/text";
import { BIP39_WORDLIST } from "@/constants/bip39";
import { useHeaderHeight } from "@react-navigation/elements";
import { HDKey } from "@scure/bip32";
import { mnemonicToSeed } from "@scure/bip39";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import { useState } from "react";
import { Linking, ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Wallet {
  address: string;
  mnemonic: string;
  privateKey: string;
}

export default function Screen() {
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  const generateRandomWords = (count: number = 12): string => {
    const mnemonicWords = [];
    const usedIndices = new Set<number>();

    // TODO: It should use entropy for better randomness
    while (mnemonicWords.length < count) {
      const index = Math.floor(Math.random() * BIP39_WORDLIST.length);
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        mnemonicWords.push(BIP39_WORDLIST[index]);
      }
    }

    return mnemonicWords.join(" ");
  };

  const generateNewWallet = async () => {
    try {
      const mnemonic = generateRandomWords();
      const masterseed = await Promise.resolve(mnemonicToSeed(mnemonic));
      const ethPath = "m/44'/60'/0'/0/0";
      const ethNode = HDKey.fromMasterSeed(masterseed).derive(ethPath);

      // Create Ethereum wallet from the derived private key using the Buffer from 'buffer' package
      const ethPrivateKey = Buffer.from(ethNode.privateKey!).toString("hex");
      const ethWallet = new ethers.Wallet(`0x${ethPrivateKey}`);
      setWallet({
        mnemonic,
        address: ethWallet.address,
        privateKey: ethWallet.privateKey,
      });
    } catch (error) {
      console.error("Error generating wallet:", error);
      throw error;
    }
  };

  return (
    <View
      style={{ height }}
      className="items-center justify-center flex-1 gap-1 px-12"
    >
      <ScrollView className="flex-1 gap-1">
        <Text variant="title3" className="pb-3 font-semibold text-center">
          Prototipe BIP39 Bahasa Indonesia
        </Text>
        <Text color="tertiary" variant="subhead" className="pb-2 text-center">
          Perhatian: Ini hanya prototipe dompet crypto yang menggunakan BIP39
          dalam Bahasa Indonesia.
        </Text>
        <Text color="tertiary" variant="subhead" className="pb-2 text-center">
          Dibuat untuk mendukung adopsi crypto dan blockchain di Indonesia yang
          terus meningkat.
        </Text>
        <Text color="tertiary" variant="subhead" className="pb-4 text-center">
          Terima kasih kepada{" "}
          <Text
            onPress={() =>
              Linking.openURL(
                "https://github.com/Adiset/Mnemonik-Bahasa-Indonesia"
              )
            }
            variant="subhead"
            className="text-primary"
          >
            Adiset
          </Text>{" "}
          yang telah menyusun BIP39 dalam Bahasa Indonesia.
        </Text>
        <Button
          onPress={async () => await generateNewWallet()}
          variant="primary"
        >
          <Text variant="title3" className="pb-1 font-semibold text-center">
            Buat Dompet EVM
          </Text>
        </Button>

        {wallet && (
          <View className="w-full p-4 mt-4 border border-gray-300 rounded-lg">
            <Text variant="subhead" className="mb-2 font-bold text-center">
              Dompet Berhasil Dibuat
            </Text>

            <View className="mb-3">
              <Text variant="subhead" className="font-bold">
                Alamat:
              </Text>
              <Text variant="footnote" className="break-all" selectable>
                {wallet.address}
              </Text>
            </View>

            <View className="mb-3">
              <Text variant="subhead" className="font-bold">
                Mnemonic:
              </Text>
              <Text variant="footnote" className="break-all" selectable>
                {wallet.mnemonic}
              </Text>
            </View>

            <View>
              <Text variant="subhead" className="font-bold">
                Kunci Pribadi:
              </Text>
              <Text variant="footnote" className="break-all" selectable>
                {wallet.privateKey}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
