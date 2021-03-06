// See https://github.com/sindresorhus/grunt-shell
module.exports = function( grunt ) {
	return {
		makepot: {
			potFile: "languages/yoast-seo.pot",
			textdomain: "js-text-analysis",
			command: function() {
				var files;

				files = [ "js/**/*.js" ];
				files = grunt.file.expand( files );

				return "xgettext" +
					" --default-domain=<%= shell.makepot.textdomain %>" +
					" -o <%= shell.makepot.potFile %>" +
					" --package-version=<%= pkg.version %> --package-name=<%= pkg.name %>" +
					" --force-po" +
					" --from-code=UTF-8" +
					" --add-comments=\"translators: \"" +
					" --add-comments=\"Translators: \"" +
					" " + files.join( " " );
			},
		},
	};
};
