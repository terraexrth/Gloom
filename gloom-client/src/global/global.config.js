import { useEffect } from "react";

export const stringToColour = (str) => {
	let hash = 0;
	if(!str){
		return '#000000';
	}
	str.split('').forEach(char => {
	  hash = char.charCodeAt(0) + ((hash << 5) - hash);
	});
	let colour = '#';
	for (let i = 0; i < 3; i++) {
	  const value = (hash >> (i * 8)) & 0xff;
	  colour += value.toString(16).padStart(2, '0');
	}
	return colour;
  };
  

  export const useHorizontalScroll = (ref) => {
	useEffect(() => {
	  const scrollContainer = ref.current;
  
	  const onWheel = (e) => {
		if (e.deltaY !== 0) {
		  scrollContainer.scrollLeft += e.deltaY;
		  e.preventDefault();
		}
	  };
  
	  if (scrollContainer) {
		scrollContainer.addEventListener('wheel', onWheel);
	  }
  
	  return () => {
		if (scrollContainer) {
		  scrollContainer.removeEventListener('wheel', onWheel);
		}
	  };
	}, [ref]);
  };
  
