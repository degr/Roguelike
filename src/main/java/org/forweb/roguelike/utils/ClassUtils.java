package org.forweb.roguelike.utils;

import org.springframework.cglib.core.ReflectUtils;

import java.io.File;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Ror on 09.01.2016.
 */
public class ClassUtils {
    private static final char DOT = '.';

    private static final char SLASH = '/';

    private static final String CLASS_SUFFIX = ".class";

    private static final String BAD_PACKAGE_ERROR = "Unable to get resources from path '%s'. Are you sure the package '%s' exists?";


    public static List<String> getClasses(String scannedPackage, boolean recursively) throws Exception {
        String scannedPath = scannedPackage.replace(DOT, SLASH);
        URL scannedUrl = Thread.currentThread().getContextClassLoader().getResource(scannedPath);
        if (scannedUrl == null) {
            throw new Exception(String.format(BAD_PACKAGE_ERROR, scannedPath, scannedPackage));
        }
        File scannedDir = new File(scannedUrl.getFile());
        List<String> classes = new ArrayList<>();
        for (File file : scannedDir.listFiles()) {
            classes.addAll(find(file, scannedPackage, recursively, true));
        }
        return classes;
    }

    public List<String> getPackages(String scannedPackage, boolean recursively) {
        String scannedPath = scannedPackage.replace(DOT, SLASH);
        URL scannedUrl = Thread.currentThread().getContextClassLoader().getResource(scannedPath);
        List<String> packages = new ArrayList<>();
        if (scannedUrl == null) {
            return packages;
        }
        File scannedDir = new File(scannedUrl.getFile());
        for (File file : scannedDir.listFiles()) {
            packages.addAll(find(file, scannedPackage, recursively, false));
        }
        return packages;
    }

    private static List<String> find(File file, String scannedPackage, boolean recursively, boolean getClasses) {
        List<String> out = new ArrayList<>();
        String resource = scannedPackage + DOT + file.getName();
        if (file.isDirectory()) {
            if(!getClasses) {
                out.add(resource);
            }
            if(recursively) {
                for (File child : file.listFiles()) {
                    out.addAll(find(child, resource, true, getClasses));
                }
            }
        } else if (resource.endsWith(CLASS_SUFFIX) && getClasses) {
            int endIndex = resource.length() - CLASS_SUFFIX.length();
            String className = resource.substring(0, endIndex);
            try {
                Class.forName(className);
                out.add(className);
            } catch (ClassNotFoundException ignore) {
            }
        }
        return out;
    }

    public static <C>Class<C> getClass(String packageName, String className) throws Exception {
        List<String> classNames = getClasses(packageName, true);
        for(String currentClassName : classNames) {
            try {
                Class current = Class.forName(currentClassName);
                if (isNormalClass(current)) {
                    continue;
                }
                if(currentClassName.endsWith("." + className)) {
                    return current;
                }
                
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static boolean isNormalClass(Class clazz) {
        return !Modifier.isInterface(clazz.getModifiers()) && !Modifier.isAbstract(clazz.getModifiers());
    }
}
