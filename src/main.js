(function () {
	'use strict';
	// check mac os
	let isMetaKey = navigator.userAgent.toLowerCase().indexOf('mac') !== -1;

	/** キー押下処理 */
	const hookEnter = function(e) {
		// key change
		let key = isMetaKey ? e.metaKey : e.ctrlKey;
		if (e.code == "Enter" && !key) {
			e.stopPropagation();
		}
	};
	/**
	 * テキストエリアを取得する
	 * @param mutations 変更要素の一覧
	 */
	const getTextArea = function(mutations) {
		for(const mutation of mutations) {
			for(const node of mutation.addedNodes) {
				const textarea = node.querySelector('#prompt-textarea');
				if (textarea !== null) return textarea;
			}
		}
		return null;
	};
	/**
	 * DOM更新の監視し、更新対象にtextareaがあればリスナーを再設定する
	 * @param mutations
	 * @param observer
	 */
	const updateCallback = function(mutations, observer) {
		let textarea = getTextArea(mutations);
		if (textarea === null) return;
		// 一度削除する
		textarea.removeEventListener('keydown', hookEnter);
		// 改行処理をフックする
		textarea.addEventListener('keydown', hookEnter, {capture: true});
	};
	const observer = new MutationObserver(updateCallback);
	observer.observe(document.body, {attributes: true, childList: true, subtree: true});
})();
