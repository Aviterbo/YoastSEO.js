import { inherits } from "util";

import IntroductionKeywordAssessment from "../assessments/seo/IntroductionKeywordAssessment";
import KeyphraseLengthAssessment from "../assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "../assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "../assessments/seo/MetaDescriptionKeywordAssessment";
import TextCompetingLinksAssessment from "../assessments/seo/TextCompetingLinksAssessment";
import InternalLinksAssessment from "../assessments/seo/InternalLinksAssessment";
import TitleKeywordAssessment from "../assessments/seo/TitleKeywordAssessment";
import UrlKeywordAssessment from "../assessments/seo/UrlKeywordAssessment";
const Assessor = require( "../assessor" );
const SEOAssessor = require( "../seoAssessor" );
const keywordStopWords = require( "../assessments/seo/keywordStopWordsAssessment" );
const MetaDescriptionLength = require( "../assessments/seo/metaDescriptionLengthAssessment" );
const SubheadingsKeyword = require( "../assessments/seo/subheadingsKeywordAssessment" );
const TextImages = require( "../assessments/seo/textImagesAssessment" );
const TextLength = require( "../assessments/seo/textLengthAssessment" );
const OutboundLinks = require( "../assessments/seo/outboundLinksAssessment" );
const TitleWidth = require( "../assessments/seo/pageTitleWidthAssessment" );
const UrlLength = require( "../assessments/seo/urlLengthAssessment" );
const urlStopWords = require( "../assessments/seo/urlStopWordsAssessment" );

/**
 * Creates the Assessor
 *
 * @param {Object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
const CornerstoneSEOAssessor = function( i18n, options ) {
	Assessor.call( this, i18n, options );

	this._assessments = [
		new IntroductionKeywordAssessment(),
		new KeyphraseLengthAssessment(),
		new KeywordDensityAssessment(),
		keywordStopWords,
		new MetaDescriptionKeywordAssessment(),
		new MetaDescriptionLength( {
			scores:	{
				tooLong: 3,
				tooShort: 3,
			},
		} ),
		new SubheadingsKeyword(
			{
				scores: {
					noMatches: 3,
					oneMatch: 6,
					multipleMatches: 9,
				},
			}
		),
		new TextCompetingLinksAssessment(),
		new TextImages( {
			scores: {
				noImages: 3,
				withAltNonKeyword: 3,
				withAlt: 3,
				noAlt: 3,
			},
		} ),
		new TextLength( {
			recommendedMinimum: 900,
			slightlyBelowMinimum: 400,
			belowMinimum: 300,
			farBelowMinimum: 0,

			scores: {
				belowMinimum: -20,
				farBelowMinimum: -20,
			},
		} ),
		new OutboundLinks( {
			scores: {
				noLinks: 3,
			},
		} ),
		new TitleKeywordAssessment(),
		new InternalLinksAssessment(),
		new TitleWidth(
			{
				scores: {
					widthTooShort: 3,
					widthTooLong: 3,
				},
			}
		),
		new UrlKeywordAssessment(
			{
				scores: {
					noKeywordInUrl: 3,
				},
			}
		),
		new UrlLength( {
			scores: {
				tooLong: 3,
			},
		} ),
		urlStopWords,
	];
};

inherits( CornerstoneSEOAssessor, SEOAssessor );

module.exports = CornerstoneSEOAssessor;
