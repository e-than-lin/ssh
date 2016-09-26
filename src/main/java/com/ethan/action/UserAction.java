package com.ethan.action;

/**
 * Created by ETHAN on 2016/9/22.
 */

import java.sql.Timestamp;
import java.util.UUID;

import javax.annotation.Resource;

import com.ethan.action.com.ethan.domain.User;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;

import com.itron.receive.Rmessage;
import com.itron.service.MessageServiceI;
import com.opensymphony.xwork2.ModelDriven;

@Action(value = "messageAction")
public class UserAction extends BaseAction implements ModelDriven<User> {

    private static final long serialVersionUID = 1L;
    private static final Logger logger = Logger.getLogger(User.class);

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