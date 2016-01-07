package org.forweb.roguelike.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Ror on 03.01.2016.
 */
@Entity
@Table(name = "user")
public class User extends AbstractEntity {
    private String email;
    private String password;
    private Integer permission;
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getPermission() {
        return permission;
    }

    public void setPermission(Integer permission) {
        this.permission = permission;
    }
}
