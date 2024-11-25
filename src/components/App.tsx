import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentArticleState={defaultArticleState}
				setCurrentArticleState={setCurrentArticleState}
			/>
			<Article />
		</div>
	);
};
