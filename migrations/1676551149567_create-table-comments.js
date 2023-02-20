/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        thread: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        is_delete: {
            type: 'boolean',
            notNull: true,
            default: 'false',
        },
    });

    pgm.addConstraint(
        'comments',
        'comments_owner_fk_users_id',
        'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
    );
    pgm.addConstraint(
        'comments',
        'comments_thread_threads_id',
        'FOREIGN KEY(thread) REFERENCES threads(id) ON DELETE CASCADE'
    );
};

exports.down = pgm => {
    pgm.dropTable('comments');
};
