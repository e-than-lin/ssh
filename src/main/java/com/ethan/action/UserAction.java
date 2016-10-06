package com.ethan.action;

/**
 * Created by ETHAN on 2016/9/22.
 */


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;

import com.ethan.domain.User;
import com.opensymphony.xwork2.ModelDriven;

@Action(value = "messageAction")
public class UserAction extends BaseAction implements ModelDriven<User> {

    private static final long serialVersionUID = 1L;
    private static final Logger logger = LogManager.getLogger();

    User user = new User();

    @Override
    public User getModel() {
        return user;
    }


    public void getUser() {
        try {
            user.setUserName("admin");
            user.setNote("this is a note");
            super.writeJson(user);

        } catch (Exception e) {
            super.writeJson(false);
            logger.error(e);
        }
    }
}