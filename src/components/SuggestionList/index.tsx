import React from 'react';
import useSuggestion from '../../hooks/useSuggestion';
import './style.scss';

interface SuggestionListProps {
  text: string;
  words: string[];
  callbackSelectSuggestion: any;
}

const SuggestionList: React.FC<SuggestionListProps> = ({
  text,
  words,
  callbackSelectSuggestion
}) => {

  const { suggestions, activeIndex } = useSuggestion(text, words, callbackSelectSuggestion);

  return (
    <>
    { 
      (suggestions.length > 0) && 
      <ul className="suggestion-list">
      {
        suggestions.map((suggestion, i) => {
          const isActive = i === activeIndex ? 'is-active' : '';
          return  (
            <li 
              key={suggestion} 
              className={isActive} 
              // onClickだとクリックイベントが呼び出される前にinput要素のonblurイベントが発火し、リストが非表示になってしまうので
              // onClickの代わりにonMousedownイベントを登録する
              onMouseDown={()=>{ callbackSelectSuggestion(suggestion) }}
            >
              {suggestion}
            </li>
          )
        })
      }
      </ul>
    }
    </>
  )
}

export default SuggestionList;