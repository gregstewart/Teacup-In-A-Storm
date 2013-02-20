source 'http://rubygems.org'

gem 'rails', '3.2.12'
gem 'rake', '10.0.3'
gem 'haml'
gem 'sass'
gem 'jquery-rails'

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
  gem 'webrat', '0.7.1'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
end

group :test do
  gem 'simplecov'
  gem "jasmine"
end

group :production do
  # Use unicorn as the web server
  gem 'unicorn'
end