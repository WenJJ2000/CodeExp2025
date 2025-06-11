// import React, { useEffect, useRef } from "react";
// import { Animated, Dimensions, View } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const { width } = Dimensions.get("window");

// export default function ProfileWaveHighlight() {
//   const translateX = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(translateX, {
//         toValue: -width,
//         duration: 4000,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [translateX]);

//   return (
//     <View style={{ position: "absolute", top: 60, left: 0, zIndex: -1 }}>
//       <Animated.View style={{ transform: [{ translateX }] }}>
//         <Svg width={width * 2} height={60} viewBox={`0 0 ${width * 2} 60`}>
//           <Path
//             d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30 T500,30 T600,30"
//             fill="none"
//             stroke="#0080ff"
//             strokeWidth={2}
//             strokeOpacity={0.2}
//           />
//           <Path
//             d="M0,40 Q50,20 100,40 T200,40 T300,40 T400,40 T500,40 T600,40"
//             fill="none"
//             stroke="#0080ff"
//             strokeWidth={2}
//             strokeOpacity={0.1}
//           />
//         </Svg>
//       </Animated.View>
//     </View>
//   );
// }

// import React, { useEffect, useRef } from "react";
// import { Animated, Dimensions, View } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const { width } = Dimensions.get("window");

// export default function ProfileWaveHighlight() {
//   const translateX = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(translateX, {
//         toValue: -width,
//         duration: 6000,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   return (
//     <View style={{ position: "absolute", top: 60, left: 0, zIndex: -1 }}>
//       <Animated.View style={{ flexDirection: "row", transform: [{ translateX }] }}>
//         {[0, 1].map(i => (
//           <Svg key={i} width={width} height={60} viewBox={`0 0 ${width} 60`}>
//             <Path
//               d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30 T500,30"
//               fill="none"
//               stroke="#0080ff"
//               strokeWidth={2}
//               strokeOpacity={0.2}
//             />
//             <Path
//               d="M0,40 Q50,20 100,40 T200,40 T300,40 T400,40 T500,40"
//               fill="none"
//               stroke="#0080ff"
//               strokeWidth={2}
//               strokeOpacity={0.1}
//             />
//           </Svg>
//         ))}
//       </Animated.View>
//     </View>
//   );
// }

import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function ProfileWaveHighlight() {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -width,
        duration: 6000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const wavePath = `
    M0 30 
    C ${width * 0.25} 0, ${width * 0.75} 60, ${width} 30 
    C ${width * 1.25} 0, ${width * 1.75} 60, ${width * 2} 30
  `;

  return (
    <View style={{ position: "absolute", top: 60, left: 0, zIndex: -1 }}>
      <Animated.View
        style={{
          flexDirection: "row",
          width: width * 2,
          transform: [{ translateX }],
        }}
      >
        <Svg width={width * 2} height={60}>
          <Path
            d={wavePath}
            fill="none"
            stroke="#0080ff"
            strokeWidth={2}
            strokeOpacity={0.25}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
