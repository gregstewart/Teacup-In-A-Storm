#---
# Excerpted from "Deploying Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material, 
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose. 
# Visit http://www.pragmaticprogrammer.com/titles/cbdepra for more book information.
#---
require 'bundler/capistrano'

set :application, "teacupinastorm"
set :scm, :git
set :repository, "https://github.com/gregstewart/Teacup-In-A-Storm.git"
server "li188-223.members.linode.com", :web, :app, :db, :primary => true
ssh_options[:port] = 22
ssh_options[:keys] = "~/.ssh/id_rsa"
set :user, "tcias"
set :group, "tcias"
set :deploy_to, "/home/tcias/app/"
set :use_sudo, false
set :deploy_via, :copy
set :copy_strategy, :export
set :unicorn_config, "#{current_path}/config/unicorn.rb"
set :unicorn_pid, "#{current_path}/tmp/pids/unicorn.pid"
set :keep_releases, 2
set :bundle_flags, "--deployment --local --quiet"

# RVM bootstrap: change to your Ruby and GemSet
# make sure this gem is installed!
set :rvm_ruby_string, ENV['GEM_HOME'].gsub(/.*\//,"") # Read from local system
require "rvm/capistrano"                               # Load RVM's capistrano plugin.
set :rvm_type, :system

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  #desc "Restart the application"
  #task :restart, :roles => :app, :except => { :no_release => true } do
  #  run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  #end
  task :start, :roles => :app, :except => { :no_release => true } do
    run "cd #{current_path} && bundle exec unicorn -c #{unicorn_config} -E #{rails_env} -D"
  end
  task :stop, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} kill `cat #{unicorn_pid}`"
  end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} kill -s USR2 `cat #{unicorn_pid}`"
  end
  task :symlink_shared do
    run "ln -s #{shared_path}/api_keys.yml #{release_path}/config/"
  end
end

before "deploy:restart", "deploy:symlink_shared"
after "deploy:update_code", "deploy:restart", "deploy:cleanup"