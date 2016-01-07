package org.forweb.roguelike.filter;

import org.forweb.roguelike.utils.UserUtils;
import org.forweb.roguelike.utils.Utils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by rsmirnou on 10/12/2015. 06
 */
public class AuthorizationFilter implements Filter{

    private String adminPageMapping;
    @Override
    public void destroy() {} 
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //adminPageMapping = Utils.getControllerMapping(AdminAbstractController.class);
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        /*HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        HttpSession session = request.getSession(false);
        Integer userId = UserUtils.getUserId(session);
        boolean isLoginPage = Utils.removeTrailingSlash(request.getPathInfo())
                .equals(adminPageMapping + AdminUserActionsController.MAPPING_LOGIN);
        String redirectUrl = isLoginPage
                ? (userId != null ? AdminCommonController.MAPPING_HOME : null)
                : (userId == null ? AdminUserActionsController.MAPPING_LOGIN : null);
        if(redirectUrl != null) {
            String url = "/" + AppInitializer.SPRING_MAPPING + adminPageMapping + redirectUrl;
            response.sendRedirect(url);
        } else {
            chain.doFilter(req, res);
        }*/
    }
    
    
}

