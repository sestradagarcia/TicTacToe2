import { Text, View } from '@lightningjs/solid';
import { Column } from '@lightningjs/solid-primitives';
import { useNavigate } from "@solidjs/router";
import { activeElement } from "@lightningjs/solid";
import { createEffect, createSignal, onMount } from 'solid-js';

export default function Menu({ items }) {
  const [indicatorPosition, setIndicatorPosition] = createSignal(0)
  const navigate = useNavigate();

  let indicator;

  const handleEnter = (path) => {
    navigate(path)
    console.log("path set", path)
    console.log(activeElement().key)
  }

  const handleFocus =(index)=>{
    setIndicatorPosition(index*120)
    console.log("index on focus", index)
  }

  onMount(() => {
    setTimeout(() => {
        indicator.animate({ x: 10}, { duration: 600, loop:true, easing: 'ease-in-out' }).start();
    }, 50);
  })

  createEffect(() => {
    indicator.y = indicatorPosition();
  });

  return (
    <View>
      <Text ref={indicator} style={{x: 0}}>&gt;</Text>
      <Column autofocus forwardFocus={0}> 
        <For each={items}>
          {(item, index) => (
            <Text key={index()} onFocus={()=> handleFocus(index())} onEnter={() => handleEnter(item.path)} 
                  style={{ x: 100, y: index() * 120, focus: { color: 0x40ffffff } }}>
              {item.label}
            </Text>
          )}
        </For>
      </Column>
    </View>
  )
}
