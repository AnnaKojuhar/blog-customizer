import React, { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
export type OnClick = () => void;

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		setSelectArticleState(currentArticleState);
	}, [currentArticleState]);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectArticleState);
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						title={'шрифт'}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							handleChange('fontFamilyOption', selectedOption)
						}></Select>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(selectedSize) =>
							handleChange('fontSizeOption', selectedSize)
						}
						title='Размер'></RadioGroup>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(selectedColor) =>
							handleChange('fontColor', selectedColor)
						}
						title='Цвет шрифта'></Select>

					<Separator />

					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(backgroundColor) =>
							handleChange('backgroundColor', backgroundColor)
						}
						title='Цвет фона'></Select>

					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(contentWidth) =>
							handleChange('contentWidth', contentWidth)
						}
						title='Ширина контента'></Select>

					<div className={styles.bottomContainer}>
						<Button
							onClick={() => {
								setSelectArticleState(defaultArticleState);
								setCurrentArticleState(defaultArticleState);
							}}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
