#!/bin/bash
gitlab-rails runner "user = User.where(id: 1).first; user.password = 'Pierr01999.'; user.password_confirmation = 'Pierr01999.'; user.save!"
