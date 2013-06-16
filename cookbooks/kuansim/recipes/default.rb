#
# Cookbook Name:: kuansim
# Recipe:: default
#
# Copyright (C) 2013 YOUR_NAME
# 
# All rights reserved - Do Not Redistribute
#

template "/etc/init/kuansim.conf" do
    source "kuansim.conf.erb"
    owner "root"
    group "root"
    mode "0644"
end

service "kuansim" do
    provider Chef::Provider::Service::Upstart
    supports :start => true, :stop => true
    action [ :enable, :start ]
end
