source 'http://rubygems.org'

gem 'rails', '3.2.12'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer'

  gem 'uglifier', '>= 1.0.3'
end

gem 'rake', '10.0.4'
gem 'haml'
gem 'jquery-rails'

gem 'feedzirra'
gem 'instagram'
gem 'octokit'
gem 'twitter'
gem 'vimeo'
gem 'whenever', :require => false

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug'

# Bundle the extra gems:
# gem 'bj'
# gem 'nokogiri'
# gem 'sqlite3-ruby', :require => 'sqlite3'
# gem 'aws-s3', :require => 'aws/s3'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:

group :development, :test do
  gem 'rspec-rails', '2.8.1'
  gem 'jasmine-rails'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'capistrano'
  gem 'rvm-capistrano'
end

group :test do
  gem 'spork'
  gem 'simplecov'
  gem 'coveralls', require: false
  gem 'capybara', '1.1.2'
end

group :production do
  # Use unicorn as the web server
  gem 'unicorn'
end