source 'https://rubygems.org'
source 'https://BnrJb6FZyzspBboNJzYZ@gem.fury.io/govuk/'

ruby "2.0.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use postgres as the database for Active Record
gem 'pg'

# for Heroku
gem 'rails_12factor', group: :production

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Enable HAML (required for MOJ toolkit)
gem 'haml-rails'

# Gov.uk styles
gem 'govuk_frontend_toolkit'

# MOJ styles
gem 'moj_frontend_toolkit_gem', git: 'https://github.com/ministryofjustice/moj_frontend_toolkit_gem.git', tag: 'v0.0.40'

# bootstrap 3
gem 'therubyracer'
# gem 'less-rails-bootstrap', '~> 3.0.0.wip', github: 'sinfin/less-rails-bootstrap-3'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

gem 'simple_form', '>= 3.0.0.rc'

gem 'nkss-rails', github: 'nadarei/nkss-rails'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :development do
  gem 'guard'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'spork', '1.0.0rc3'
  gem 'spork-rails', :github => 'sporkrb/spork-rails'
  gem 'guard-spork'
end

group :development, :test do
  gem 'rspec-rails', '~> 2.0'
  gem "factory_girl_rails", "~> 4.0"
  gem 'sqlite3', '1.3.7'
  gem "assert_difference", "~> 0.5.0"
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'meta_request'
  gem 'awesome_print'
  gem 'hirb'
  gem 'wirble'
  gem 'wirb'
  gem 'jazz_hands'
end

# it's a prototype after all
gem "random_data", "~> 1.6.0"

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the app server
gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
