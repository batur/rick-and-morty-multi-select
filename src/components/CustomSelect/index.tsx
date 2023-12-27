import React, { useCallback, memo } from 'react';

import cn from 'classnames';
import Select from 'react-select';
import { type Character } from 'rickmortyapi';

import Icons from '../Icons';

interface Props {
  search: string;
  data: Character[];
  isLoading: boolean;
  setSearch: (value: string) => void;
}
const CustomSelect: React.FC<Props> = ({ search, data, isLoading, setSearch }) => {
  const resetSearchValue = React.useCallback(() => {
    setTimeout(() => {
      setSearch('');
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLabelWithSearchValue = useCallback(
    (label: string) => {
      return label.toLocaleLowerCase().replace(search.toLocaleLowerCase(), `<strong>${search}</strong>`);
    },
    [search]
  );

  return (
    <Select
      classNames={{
        menuList: () => '!p-0 flex flex-col border-slate-400 border-1 !rounded-md',
        multiValue: () => '!mr-1 flex items-center justify-center !rounded-lg !bg-slate-200 !pl-2 pr-2  text-lg text-slate-700',
        multiValueRemove: () => 'flex items-center justify-center ml-[1px] h-6 w-6 !rounded-[0.25rem] bg-slate-400 text-slate-50',
        input: () => 'ml-1 mb-[3px] ',
        container: () => 'w-full',
        valueContainer: () => ' flex flex-row justify-centet items-start !pl-1',
        control: () => 'w-full !rounded-xl border-[1px] border-slate-700',
        indicatorSeparator: () => 'hidden',
        indicatorsContainer: () => 'pr-0',
        menu: () => '!rounded-2xl',
        dropdownIndicator: () => 'f'
      }}
      className='flex w-full'
      options={data.map((character: Character) => ({
        value: character.id,
        label: character.name,
        img: character.image,
        episodeCount: character.episode.length
      }))}
      hideSelectedOptions={false}
      onInputChange={(value) => {
        setSearch(value);
      }}
      components={{
        Option: (option) => {
          return (
            <button
              className={cn(
                'fill- flex w-full flex-1 flex-row items-center text-sm text-gray-500 pt-1.5 pb-1.5 px-2.5 border-b border-slate-300',
                option.isFocused && 'bg-slate-100'
              )}
              key={option.data.value}
              role='option'
              aria-selected={option.isSelected}
              onClick={() => {
                option.selectOption(option.data);
                resetSearchValue();
              }}>
              <input type='checkbox' className='mr-2' checked={option.isSelected} readOnly />
              <img src={option.data.img} alt={option.data.label} className='mr-2 h-9 w-9 rounded-s-md' />
              <div className='flex flex-col items-start justify-between pl-[2px]'>
                <p
                  className='pt-[1.5px] font-medium capitalize leading-6 '
                  dangerouslySetInnerHTML={{
                    __html: handleLabelWithSearchValue(option.data.label)
                  }}
                />
                <p>{`${option.data.episodeCount} Episodes`}</p>
              </div>
            </button>
          );
        },
        DropdownIndicator: (params) => {
          return (
            <button {...params} className='mr-5 aspect-square'>
              <Icons.ArrowDown width={21} height={21} className='fill-slate-700' />
            </button>
          );
        }
      }}
      isLoading={isLoading}
      isMulti
      isClearable={false}
      isSearchable
    />
  );
};

const MemoizedCustomSelect = memo(CustomSelect);
export default MemoizedCustomSelect;
