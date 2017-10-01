var 	gulp 		= require('gulp'),
	browserSync 	= require('browser-sync').create(),
	sass 		= require('gulp-sass'),
	cleanCSS 	= require('gulp-clean-css'),
	rename 	= require('gulp-rename');

// Static Server + watching sass/html files
gulp.task('browser-sync', ['sass'], function() {

	browserSync.init({
		server: "app/",
		notify: false
	});

	gulp.watch("app/sass/*.sass", ['sass']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("app/sass/*.sass")
		.pipe(sass())
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(cleanCSS())
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync']);
