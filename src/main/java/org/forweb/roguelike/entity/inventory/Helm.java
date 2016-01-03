package org.forweb.roguelike.entity.inventory;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Helm.TYPE)
public class Helm extends AbstractItem {
    public static final String TYPE = "helm";
}