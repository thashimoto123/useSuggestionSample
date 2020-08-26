import React, { useState, useCallback, useRef } from 'react';
import SuggestionList from '../SuggestionList';
import './style.scss';

const InputWithSuggestion:React.FC = () => {
  const words = ['apple','around','APPLE','あまぐり','アンチョビ','オレンジ','オレオ','オンザムーン','orange','oreo', 'on the moon'].sort();

  const [text, setText] = useState<string>('');
  const [isFoucs, setIsFocus]= useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const callbackSelectSuggestion = useCallback((text: string) => {
    setText(text);
    setIsFocus(false);
    inputRef?.current?.blur();
    console.log(text);
  }, [setText, setIsFocus, inputRef]);

  return (
    <div className="input-wrap">
      <input 
        ref={inputRef}
        type="text"
        value={text} 
        onChange={(ev) => setText(ev.target.value)} 
        onFocus={() => {setIsFocus(true)}} 
        onBlur={() => {setIsFocus(false)}}
      />
      {
        // インプット要素がフォーカスされているときだけ入力候補を表示
        isFoucs && <SuggestionList text={text} words={words} callbackSelectSuggestion={callbackSelectSuggestion} />
      }
    </div>
  )
}



export default InputWithSuggestion